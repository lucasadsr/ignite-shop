import Image from "next/image";
import { ImageContainer, ImagesWrapper, SuccessContainer } from "../styles/pages/success";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react";

interface SuccessProps {
  customerName: string
  products: {
    name: string
    images: string[]
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <>
      <Head>
        <title>Pedido Realizado | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImagesWrapper>
          {products.map((item) => {
            return (
              <ImageContainer key={item.name}>
                <Image src={item.images[0]} alt="" width={120} height={110} />
              </ImageContainer>
            )
          })}
        </ImagesWrapper>

        <p>
          Uhuu! <strong>{customerName}</strong>, sua compra de <strong>{products.length}</strong> camisetas já está a caminho da sua casa.
        </p>

        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product
    return product
  })

  return {
    props: {
      customerName,
      products,
    }
  }
}