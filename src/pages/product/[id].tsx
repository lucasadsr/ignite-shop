import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from '../../lib/stripe'
import Stripe from "stripe"
import Image from "next/image"
import Head from "next/head"
import { useShoppingCart } from "use-shopping-cart"
import { Iproduct } from ".."

interface ProductProps {
  product: Iproduct
}

export default function Product({ product }: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart()

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
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl && product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={cartDetails[product.id] ? true : false} onClick={() => handleAddItemToCart(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_ONq0q0lnXn73pB' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
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
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}