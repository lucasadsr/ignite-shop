import Image from "next/image";

import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product, ProductInfos, SliderContainer } from "../styles/pages/home";

import { useShoppingCart } from 'use-shopping-cart'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from 'phosphor-react'
import { useState } from "react";

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

  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 48,
        },
      },
    },
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
      <SliderContainer>
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
                  <button
                    disabled={cartDetails[product.id] ? true : false}
                    onClick={() => handleAddItemToCart(product)}
                  >
                    <Handbag width={32} height={32} color="#FFFFFF" weight="bold" />
                  </button>
                </footer>
              </Product>
            )
          })}
        </HomeContainer>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </SliderContainer>
    </>
  )
}

function Arrow(props: any) {
  const disabled = props.disabled ? 'arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'
        } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
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