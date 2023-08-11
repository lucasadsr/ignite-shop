import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product, ProductInfos } from "../styles/pages/home";

import { useShoppingCart } from 'use-shopping-cart'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from 'phosphor-react'

export interface Iproduct {
  name: string
  id: string
  imageUrl: string
  price: string
  description: string
  priceNotFormatted: number
  priceId: string
  defaultPriceId: string
}

interface HomeProps {
  products: Iproduct[]
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  function handleAddItemToCart(product: Iproduct) {
    if (cartDetails[product.id]) {
      return
    }

    return (
      addItem({
        currency: 'BRL',
        id: product.id,
        name: product.name,
        price: product.priceNotFormatted,
        price_id: product.priceId,
        image: product.imageUrl,
        description: product.description,
      })
    )
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false} >
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>

              <footer>
                <ProductInfos>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </ProductInfos>
                <button onClick={() => handleAddItemToCart(product)}>
                  <Handbag width={32} height={32} color="#FFFFFF" weight="bold" />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
      description: product.description,
      priceNotFormatted: price.unit_amount,
      priceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}