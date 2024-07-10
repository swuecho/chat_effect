interface OCRResult {
        confident: number;
        text: string;
}

export function extractText(easyOcrResult: OCRResult[], confidentThreshold: number = 0.0): string {
        /**
         * Confident threshold is set based on observation of current doc, unlikely to be ok in prod
         */
        const textList: string[] = easyOcrResult
                .filter(result => result.confident > confidentThreshold)
                .map(result => result.text);

        return textList.join(' ');
}
