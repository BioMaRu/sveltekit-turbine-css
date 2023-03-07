export namespace API {
	interface BaseResponse {
		ok: boolean;
		data?: any;
	}
}

export namespace User {
	interface Me {
		id: string;
		image: string;

		created_at: string;
		display_name: string;
		email: string;
		username: string;
	}
}
