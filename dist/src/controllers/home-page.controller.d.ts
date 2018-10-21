/// <reference types="express" />
import { Response } from '@loopback/rest';
export declare class HomePageController {
    private response;
    private html;
    constructor(response: Response);
    homePage(): Response;
}
