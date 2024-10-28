import { Request, Response } from "express";
import AuthService from "../services/authService";
import User from "../models/userModel";
import crypto from "crypto";

const authService = new AuthService();

export default class AuthController {
  private resetToken: string = crypto.randomBytes(20).toString("hex");
  /**
   * @swagger
   * /api/v1/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: "adham.os1988@gmail.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       201:
   *         description: Registration successful, please verify your email
   *         content:
   *           application/json:
   *              schema:
   *                 type: object
   *                 properties:
   *                   message:
   *                      type: string
   *                      example: Registration successful, please verify your email
   *       400:
   *         description: Bad request
   *       404:
   *         description: Not found
   *       409:
   *         description: Conflict
   *       500:
   *         description: Internal server error
   */

  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    await authService.register(email, password);

    // await user.save();
    res.status(201).json({
      message: "Registration successful, please verify your email",
    });
  }
  /**
   * @swagger
   * /api/v1/auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: "adham.os1988@gmail.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *              schema:
   *                 type: object
   *                 properties:
   *                   token:
   *                      type: string
   *                      example: eyJh.......
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ message: "Login successful", token });
  }

  /**
   * @swagger
   * /api/v1/auth/verify-email:
   *   get:
   *     summary: Verify user email
   *     tags: [Authentication]
   *     parameters:
   *       - in: query
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Email verification token
   *     responses:
   *       200:
   *         description: Email verified successfully
   *       400:
   *         description: Invalid or expired token
   */

  async verifyEmail(req: Request, res: Response): Promise<void> {
    const { token } = req.query;
    const user: boolean = await authService.verifyEmail(token as string);
    res.json({ message: "Email verified", user });
  }

  // async forgotPassword(req: Request, res: Response) {
  //   const { email } = req.body;
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     res.status(404).json({ message: "User not found" });
  //     return;
  //   }

  //   user.resetPasswordToken = this.resetToken;
  //   user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiry
  //   await user.save();

  //   await authService.sendResetPasswordEmail(email, this.resetToken);
  //   res.status(200).json({ message: "Reset password email sent" });
  // }
}
