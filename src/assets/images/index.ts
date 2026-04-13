import bigShoe1 from './big-shoe1.png'
import bigShoe2 from './big-shoe2.png'
import bigShoe3 from './big-shoe3.png'

import customer1 from './customer1.jpeg'
import customer2 from './customer2.svg'

import footerLogo from './footer-logo.svg'
import headerLogo from './header-logo.svg'

import offer from './offer.svg'

import shoe4 from './shoe4.svg'
import shoe5 from './shoe5.svg'
import shoe6 from './shoe6.svg'
import shoe7 from './shoe7.svg'
import shoe8 from './shoe8.svg'

import thumbnailBackground from './thumbnail-background.svg'
import thumbnailShoe1 from './thumbnail-shoe1.svg'
import thumbnailShoe2 from './thumbnail-shoe2.svg'
import thumbnailShoe3 from './thumbnail-shoe3.svg'
import { StaticImageData } from 'next/image';

export {
    bigShoe1,
    bigShoe2,
    bigShoe3,

    customer1,
    customer2,

    footerLogo,
    headerLogo,

    offer,
    shoe4,
    shoe5,
    shoe6,
    shoe7,
    shoe8,

    thumbnailBackground,
    thumbnailShoe1,
    thumbnailShoe2,
    thumbnailShoe3
}


export interface Product {
    imgURL: StaticImageData;
    name: string;
    price: string;
}
export const products: Product[] = [
    {
        imgURL: shoe4,
        name: "Nike Air Jordan-01",
        price: "200.20",
    },
    {
        imgURL: shoe5,
        name: "Nike Air Jordan-10",
        price: "210.20",
    },
    {
        imgURL: shoe6,
        name: "Nike Air Jordan-100",
        price: "220.20",
    },
    {
        imgURL: shoe7,
        name: "Nike Air Jordan-001",
        price: "230.20",
    },
] 