import styled from 'styled-components'

export const GalleryStyled = styled.div`
  overflow: scroll;

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 350px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .icons-container {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px; /* Space between the circles */
    z-index: 1; /* Ensure icons are above the image */
  }

  .icon-circle {
    width: 40px; /* Size of each circle */
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%; /* Circle shape */
    background-color: rgba(
      255,
      255,
      255,
      0.8
    ); /* Slight transparent background */
    transition: transform 0.2s ease, background-color 0.2s ease; /* Smooth hover effect */
  }

  .icon-circle:hover {
    cursor: pointer;
    transform: scale(1.1); /* Slightly enlarge on hover */
    background-color: rgba(
      255,
      255,
      255,
      1
    ); /* Full white background on hover */
  }

  .icon-circle svg {
    font-size: 20px; /* Icon size */
  }

  .image-container {
    flex: 7; /* 70% of the card height */
    height: 70%;
    width: 100%;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image doesn't stretch */
  }

  .info-container {
    flex: 3; /* 30% of the card height */
    height: 30%;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    text-align: center;
  }

  .info-container a {
    color: #007bff;
    text-decoration: none;
    font-size: 0.9rem;
    margin-top: 5px;
  }
`
