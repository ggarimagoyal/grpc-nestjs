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
		const allowedTypes = ['decimal', 'binary'];
		try {
			const { type, number, divisor } = data;
			let isDivisible: boolean = false;
			switch (type){
				case 'decimal':
					const num = Number(number);
					if(isNaN(num)) {
						throw Error(`Number should be a valid decimal number`);
					}
					isDivisible = num % divisor === 0;
					break;
				case 'binary':
					let rem = 0;
					for (let i = number.length -1; i >= 0 ; i--) {
						if (number[i] === '0') {
							rem = (rem * 2) % divisor;
						} else if (number[i] === '1') {
							rem = ((rem * 2) + 1) % divisor;
						}
					}
					isDivisible = rem % divisor === 0;
					break;
				default:
					throw Error(`Type should be one of: ${allowedTypes}`);
			}

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