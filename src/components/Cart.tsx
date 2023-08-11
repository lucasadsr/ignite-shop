import Image from "next/image";
import { BuyButton, CartContainer, CloseButton, ImageWrapper, ProductContainer, ProductDetails, Quantity, QuantityContainer, Summary, TotalPrice, TotalPriceContainer } from "../styles/components/Cart";
import { useShoppingCart } from 'use-shopping-cart'
import axios from "axios";
import { CartEntry } from "use-shopping-cart/core";

export function Cart() {
  const { cartDetails, cartCount, formattedTotalPrice, shouldDisplayCart, handleCartClick, removeItem } = useShoppingCart()

  const cart: CartEntry[] = Object.values(cartDetails)

  async function handleCheckout() {
    try {
      const response = await axios.post("/api/checkout", {
        cart,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      console.log(err)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartContainer isOpen={shouldDisplayCart}>
      <div>
        <CloseButton width={24} height={24} color="#8D8D99" onClick={() => handleCartClick()} />

        <h3>Sacola de compras</h3>
        <Summary>
          {Object.keys(cartDetails).map((id) => {
            return (
              <ProductContainer key={id}>
                <ImageWrapper>
                  <Image
                    src={cartDetails[id].image}
                    width={95}
                    height={95}
                    alt=""
                  />
                </ImageWrapper>
                <ProductDetails>
                  <p>{cartDetails[id].name}</p>
                  <strong>{cartDetails[id].formattedValue}</strong>
                  <button onClick={() => removeItem(id)}>Remover</button>
                </ProductDetails>
              </ProductContainer>
            )
          })}
        </Summary>
      </div>
      <div>
        <QuantityContainer>
          <p>Quantidade</p>
          <Quantity>{cartCount} itens</Quantity>
        </QuantityContainer>
        <TotalPriceContainer>
          <strong>Valor total</strong>
          <TotalPrice>{formattedTotalPrice}</TotalPrice>
        </TotalPriceContainer>

        <BuyButton disabled={cartCount < 1} onClick={handleCheckout}>Finalizar compra</BuyButton>
      </div>
    </CartContainer>
  )
}