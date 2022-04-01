interface Length {
  headerHiehgt: string; //App의 Header부분 높이
  largeComponentHeight: string; //컴포넌트(Button, Slider 등...) 크기 정의
  mediumComponentHeight: string; // **
  smallComponentHeight: string; // **
  componentHeight: (height: 'large' | 'medium' | 'small') => string; //컴포넌트의 크기를 반환
}

const lengthObject: Length = {
  headerHiehgt: '3.2rem',
  largeComponentHeight: '2.4rem',
  mediumComponentHeight: '2.1rem',
  smallComponentHeight: '1.7rem',
  componentHeight(this: Length, height: string) {
    if (height === 'large') return this.largeComponentHeight;
    else if (height === 'medium') return this.mediumComponentHeight;
    else return this.smallComponentHeight;
  },
};

export const light = {
  colors: {
    primary: 'rgb(121, 135, 119)',
    secondPrimary: 'rgb(162, 178, 159)',
    thirdPrimary: 'rgb(189, 210, 182)',
    ground: 'rgb(248, 237, 227)',
    background: 'rgb(250, 245, 240)',
    getColor(primary: boolean) {
      if (primary) return this.primary;
      else return 'rgb(255, 255, 255)';
    },
  },
  length: lengthObject,
};

export const dark = {
  colors: {
    primary: 'rgb(121, 135, 119)',
    secondPrimary: 'rgb(162, 178, 159)',
    thirdPrimary: 'rgb(189, 210, 182)',
    ground: 'rgb(248, 237, 227)',
    background: 'rgb(250, 245, 240)',
  },
  length: lengthObject,
};
