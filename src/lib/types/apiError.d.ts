import type { ErrorInfo } from 'remult';

export type RemultApiError = ErrorInfo & {
	status: number;
};
