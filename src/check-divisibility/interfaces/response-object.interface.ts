interface ErrorObject {
	message: string;
	reason: string;
}

interface DataObject {
	isDivisible: boolean;
}

export interface ResponseObjectSuccess {
	success: boolean;
	data: DataObject;
}

export interface ResponseObjectError {
	success: boolean;
	error: ErrorObject;
}