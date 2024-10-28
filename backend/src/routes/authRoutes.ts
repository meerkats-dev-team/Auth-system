import { Router } from "express";
import AuthController from "../controllers/authController";
import AuthValidator from "../validators/authValidator";

const router = Router();

const { validateRegister, validateLogin }: AuthValidator = new AuthValidator();
const { register, login, verifyEmail }: AuthController = new AuthController();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/verify-email", verifyEmail);

export default router;
