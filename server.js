// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para enviar mensajes desde el formulario
app.post("/api/enviar", async (req, res) => {
  const { nombre, telefono, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  try {
    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CORREO_ORIGEN,
        pass: process.env.CORREO_PASS,
      },
    });

    // Cuerpo del mensaje
    const mailOptions = {
      from: process.env.CORREO_ORIGEN,
      to: process.env.CORREO_DESTINO,
      subject: `Mensaje de contacto - ${asunto}`,
      text: `
      Nombre: ${nombre}
      Teléfono: ${telefono}
      Email: ${email}
      Mensaje: ${mensaje}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "No se pudo enviar el mensaje." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
