"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.AuthCallback = exports.LogoutButton = exports.LoginButton = void 0;
__exportStar(require("./lib/supabase/client"), exports);
var LoginButton_1 = require("./components/LoginButton");
Object.defineProperty(exports, "LoginButton", { enumerable: true, get: function () { return __importDefault(LoginButton_1).default; } });
var LogoutButton_1 = require("./components/LogoutButton");
Object.defineProperty(exports, "LogoutButton", { enumerable: true, get: function () { return __importDefault(LogoutButton_1).default; } });
var AuthCallback_1 = require("./components/AuthCallback");
Object.defineProperty(exports, "AuthCallback", { enumerable: true, get: function () { return __importDefault(AuthCallback_1).default; } });
var Demo_1 = require("./components/Demo");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(Demo_1).default; } });
