import styled from "@emotion/styled";

interface ImageUrl {
  imageUrl: string;
}

const ContainerStyle = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;
const ImageStyle = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

const LionImage = ({ imageUrl }: ImageUrl) => {
  return (
    <ContainerStyle>
      <ImageStyle src={imageUrl} alt="한양 라이언" />
    </ContainerStyle>
  );
};

export default LionImage;
