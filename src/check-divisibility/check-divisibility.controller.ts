import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { RequestParams } from './interfaces/request-params.interface';
import { ResponseObjectSuccess, ResponseObjectError } from './interfaces/response-object.interface';

interface CheckDivisibilityService {
	checkDivisibility(data: RequestParams): ResponseObjectSuccess | ResponseObjectError;
}

@Controller('/checkDivisibility')
export class CheckDivisibilityController implements OnModuleInit {

	private checkDivisibilityService: CheckDivisibilityService;

	constructor(@Inject('CHECK_DIVISIBILITY_PACKAGE') private readonly client: ClientGrpc) { }

	onModuleInit() {
		this.checkDivisibilityService = this.client.getService<CheckDivisibilityService>('CheckDivisibilityService');
	}

	@GrpcMethod('CheckDivisibilityService', 'CheckDivisibility')
	checkDivisibility(data: RequestParams): ResponseObjectSuccess | ResponseObjectError {
		try {
			const allowedTypes = ['decimal'];
			const { type, number, divisor } = data;
			if (!allowedTypes.includes(type)) {
				throw Error(`Type should be one of: ${allowedTypes}`);
			}
			const num = Number(number);
			if(isNaN(num)) {
				throw Error(`Number should be a valid ${type} number`);
			}
			const isDivisible = num % divisor === 0;
			const response: ResponseObjectSuccess = {
				success: true,
				data: {
					isDivisible
				}
			}
			return response;
		} catch (err) {
			const response: ResponseObjectError = {
				success: false,
				error: {
					message: err.message,
					reason: err.reason || err.message
				}
			}
			return response;
		}
	}
}