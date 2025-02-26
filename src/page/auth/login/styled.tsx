import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
export const LoginSwapper = styled(Box)(
  ({ theme }) => `
    .loginFormContainer {
        background-color: #fff;
        display: flex;
        height: 100%;
        flex-direction: column;
        align-content: stretch;
        padding: 0 15px;
        box-shadow: -3px 0px 20px 1px #517bbb;
    };
    .bannerContainer {
        height: 100%;
        position: relative;
        .bannerImage {
            height: 100%;
            background: url(/assets/images/slider/1.jpg) ;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        };
        .bannerBg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            backdrop-filter: saturate(110%) blur(1px);
        }
    };
    .googleButton{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        background-color: #edecec;
        border-radius: 10px;
        margin: 15px auto;
        box-shadow: 0 2px 4px rgba(34,34,34,.12);
        cursor: pointer;
        &:hover {
            background-image: linear-gradient(rgba(255,255,255,.1),rgba(0,0,0,.1));
        }
    }`
);

export const LineWrapper = styled(Box)(
  ({ theme }) => `
    width: 60px;
    height: 1px;
    background-color: #ddd
    `
);

export const HeaderWrapper = styled(Box)(
  ({ theme }) => `
    text-align: center;
    flex-grow: 3;
    padding: 10px 0;
    `
);
