
export const getGraphicElements = (textData, lineTops, textHeader) => {
    return [
        // Map teks
        ...textData.map(item => ({
            type: 'text',
            left: '32%',
            top: item.top,
            style: {
                text: item.text,
                font: '14px sans-serif',
                fill: '#000'
            }
        })),
        // Map garis
        ...lineTops.map(top => ({
            type: 'line',
            left: '15%',
            top: top,
            shape: { x1: 0, y1: 0, x2: 1000, y2: 0 },
            style: {
                stroke: 'gray',
                lineWidth: 2
            }
        })),
        // Header teks
        ...textHeader.map(header => ({
            type: 'text',
            left: header.left,
            top: '0',
            style: {
                text: header.text,
                fill: '#333',
                font: 'bold 16px sans-serif'
            }
        }))
    ];
};
