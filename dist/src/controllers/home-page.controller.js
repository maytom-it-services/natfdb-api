"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const openapi_v3_1 = require("@loopback/openapi-v3");
const fs = require("fs");
const path = require("path");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
let HomePageController = class HomePageController {
    constructor(response) {
        this.response = response;
        this.html = fs.readFileSync(path.join(__dirname, '../../../public/index.html'), 'utf-8');
    }
    homePage() {
        this.response
            .status(200)
            .contentType('html')
            .send(this.html);
        return this.response;
    }
};
__decorate([
    openapi_v3_1.get('/', {
        responses: {
            '200': {
                description: 'Home Page',
                content: { 'text/html': { schema: { type: 'string' } } },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomePageController.prototype, "homePage", null);
HomePageController = __decorate([
    __param(0, context_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    __metadata("design:paramtypes", [Object])
], HomePageController);
exports.HomePageController = HomePageController;
//# sourceMappingURL=home-page.controller.js.map