import styled from '@emotion/styled'
import Image from 'next/image'

export default function AutoSizeImage({ image }: { image: string }) {
  return (
    <AutoSizeImageWrapper>
      <Image src={image} layout={'fill'} alt="" objectFit={'contain'} />
    </AutoSizeImageWrapper>
  )
}

const AutoSizeImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
