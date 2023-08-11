"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActivationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_activation_dto_1 = require("./create-activation.dto");
class UpdateActivationDto extends (0, swagger_1.PartialType)(create_activation_dto_1.CreateActivationDto) {
}
exports.UpdateActivationDto = UpdateActivationDto;
//# sourceMappingURL=update-activation.dto.js.map