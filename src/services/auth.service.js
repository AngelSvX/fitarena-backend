import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { myGymDB } from "../settings/db.js";

export const auth = async ({ email, password }) => {
  try {
    const myQuery = `
    SELECT u.id, u.nombre, u.email, u.password, r.name as roleName FROM usuarios u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?
    `;

    const [response] = await myGymDB.execute(myQuery, [email]);

    // ¿Existe?
    const user = response[0];

    if (!user) {
      return {
        found: false,
      };
    }

    // ¿La contraseña es la correcta?
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        found: true,
        isMatch: false,
      };
    }
    const token =
      // Todo correcto, se envía la respuesta del usuario al front
      jwt.sign(
        {
          id: user.id,
          name: user.nombre,
          email: user.email,
          role: user.roleName,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

    return {
      found: true,
      isMatch: true,
      token,
    };
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({
  role_id,
  nombre,
  password,
  email,
  telefono,
  direccion,
}) => {
  try {
    const insertUserQuery = `
      INSERT INTO usuarios 
      (role_id, nombre, password, email, telefono, direccion)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const passwordHashed = await bcrypt.hash(password, 10);

    const response = await myGymDB.execute(insertUserQuery, [
      role_id,
      nombre,
      passwordHashed,
      email,
      telefono,
      direccion
    ]);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
