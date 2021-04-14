import { RequestParams } from './request-params.interface';
import { ResponseObjectSuccess, ResponseObjectError } from './response-object.interface';
import { BinaryStream } from './binary-stream.interface';
import { Observable } from 'rxjs';

export interface CheckDivisibilityService {
	checkDivisibility(data: RequestParams): ResponseObjectSuccess | ResponseObjectError;
	checkBinaryStream(upstream: Observable<BinaryStream>): Observable<ResponseObjectSuccess | ResponseObjectError>
}