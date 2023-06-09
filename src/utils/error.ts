import { NextResponse } from 'next/server';

export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const errorResponse = (error: unknown) => {
  return NextResponse.json(
    {
      message:
        error instanceof HttpError ? error.message : 'Something went wrong',
    },
    { status: error instanceof HttpError ? error.status : 500 }
  );
};
