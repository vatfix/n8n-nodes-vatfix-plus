"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credClass = exports.nodeClass = void 0;
const Vatfix_node_1 = require("./nodes/Vatfix/Vatfix.node");
Object.defineProperty(exports, "nodeClass", { enumerable: true, get: function () { return Vatfix_node_1.Vatfix; } });
const VatfixApi_credentials_1 = require("./credentials/VatfixApi.credentials");
Object.defineProperty(exports, "credClass", { enumerable: true, get: function () { return VatfixApi_credentials_1.VatfixApi; } });
