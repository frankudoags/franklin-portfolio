'use client';

import { initLenisWithGSAP } from 'lib/utils';
import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		initLenisWithGSAP();
	}, []);

	return <>{children}</>;
}
