import { Injectable } from '@nestjs/common';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
@Injectable()
export class AppService {
	getHello(): string {
		return renderToStaticMarkup(
			React.createElement('div', null, 'Hello World!'),
		);
	}
}
