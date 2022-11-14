import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../action/board';
import styled from 'styled-components'
import img from '../imgs/한반도.png'
import {FaSkiing} from 'react-icons/fa'
import { SkiButton } from '../components/SkiButton'
import resortData from '../data/resort.json'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import shortid from 'shortid';

export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector(state => state.board.posts);
    const isAuth = useSelector(state => state.auth.isAuth);
    const [top3, setTop3] = useState([]);
    const MyResort = ["엘리시안", "스키장2", "스키장3"];

    const clickLogin = e => {
        navigate('/login');
    }

    useEffect(() => {
        if (isAuth) {
            dispatch(loadPosts());
            if (posts) setTop3(posts.slice(-3).reverse());
        }
    }, [isAuth]);
    return(
        <Container>
            <Wrapper>
                <Index>게시판</Index>
                <BoardBox>
                    {/* loadPost(id)로 최근 3개 불러와서, 배열에 저장? */}
                    {/* 배열로 map */}
                    {/*top3 && top3.map(post => (
                        <Row><div>{post.title}</div></Row>
                    ))*/}
                </BoardBox>
            </Wrapper>

            <Wrapper>
                <Index>내 스키장</Index>
                <Box>
                    {
                        isAuth ? 
                        MyResort.map((resort) => (
                            <MySkiWrap>
                            <MySki>
                                <FaSkiing className="home-ski-icon" />
                            </MySki>
                            <div className="home-resort-name">{resort}</div>
                            </MySkiWrap>
                        ))
                        : 
                        // <MySkiWrap>
                        <NoAuthWrap>
                            <MySki>
                                <FaSkiing className="home-ski-icon" />
                            </MySki>
                            <NoAuthMySki>
                                <NoAuthText>로그인 후 자주 가는 스키장을 추가해보세요 !</NoAuthText>
                                <span><NoAuthBtn className="home-login" onClick={clickLogin}>로그인</NoAuthBtn><NoAuthReg className="home-login">회원가입</NoAuthReg> </span>
                            </NoAuthMySki>
                            </NoAuthWrap>
                        //</MySkiWrap>
                    }
                </Box>
            </Wrapper>
            
            <Map>
            <Grid container className="home-grid">
                {
                    resortData.map(resort => (
                        <Grid item xs={6} className="home-grid-item" key={shortid.generate()}><SkiButton {...resort} /></Grid>
                    ))
                }
            </Grid>
            </Map>
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;
`

const Wrapper = styled.div`
margin-bottom: 20px;
`
const Index = styled.div`
    font-weight: bolder;
    margin-top: 15px;
`
const BoardBox = styled.div`
//background-color: #EFEADD;
background-color:#FAFAFA;
margin-top: 10px;
box-shadow: 10px 7px 12px -2px rgba(17, 20, 24, 0.15);

height: 150px;
`
const Row = styled.div`
`
const Box = styled.div`
display: flex;
border-radius: 10px;
padding: 15px 0;

//height: 8rem;


}
`

const MySkiWrap = styled.div`
    display: block;
    text-align: center;

    .home-resort-name {
        font-size: 14px;
        padding-top: 7px;
    }
`

const MySki = styled.button`
//background-color: #86B0B4;
background-color: #6B89A5;
box-shadow: 0 0 1px 1px rgba(17, 20, 24, 0.1);
border-radius: 45px;
border: none;
margin-right: 7px;
margin-left: 7px;
width: 90px;
height: 90px;
text-align: center;
font-size: 14px;
line-height: 100px;
font-weight: bold;

.home-ski-icon {
    width: 25px;
    height: 25px;
    color: black;
}
`



const Map = styled.div`
//background-image: url(${img});
background:url(${img}) no-repeat center;
background-size: fill;
width: 100%;
height: 490px;
.home-grid-item{
    height: 55px;
}
`

const Button = styled.div`
    display: flex;
    font-size: 14px;
    margin: 20px;
`

const Region = styled.div`
    background-color: #C2CFD8;
    padding: 10px;
    border-radius: 10px 0 0 10px;
    //border: 1px solid #48494B;
    box-shadow: 4px 6px 6px -2px rgba(17, 20, 24, 0.15);
`

const ResortName = styled.div`
    background-color: #FAFAFA;
    border-radius: 0 10px 10px 0;
    padding: 10px;
    //border: 1px solid #48494B;
    box-shadow: 4px 6px 6px -2px rgba(17, 20, 24, 0.15);
`
const NoAuthWrap = styled.div`
border-bottom: 1px solid gray;
display: flex;
padding-bottom: 20px;
`
const NoAuthMySki = styled.div`
font-size: 12px;
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
padding-left: 10px;
padding-top: 10px;
.home-login{
    border-radius: 15px;
    padding: 8px;
    border: none;
    box-shadow: 2px 4px 4px -2px rgba(17, 20, 24, 0.15);
    margin: 10px 3px;
}
`
const NoAuthBtn = styled.button`
background-color: #6B89A5;
color: #FAFAFA;
    
`
const NoAuthReg = styled.button`
background-color: #FAFAFA;
color: #6B89A5;
`
const NoAuthText = styled.div`

`