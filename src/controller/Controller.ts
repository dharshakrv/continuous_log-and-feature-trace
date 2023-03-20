import { Router } from "express";

/**
 * Controller interface
 */
export interface Controller {
    getRouter(): Router
}