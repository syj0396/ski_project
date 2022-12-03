import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { addMyResort, deleteMyResort } from '../action/resort'
import { addBookmark, deleteBookmark, loadBookmarks } from '../action/bookmark';
import styled from 'styled-components'
import shortid from 'shortid';
import { Loading } from './common/Loading';
import resorts  from '../data/resort.json';
import { BsBoxArrowUpRight } from 'react-icons/bs';

export function ResortModal(props) {
    const dispatch = useDispatch();
    const [emptyStar, setEmptyStar] = useState(!props.like);
    const resortData = resorts.filter(resort => resort.id !== null);
    const t_date = new Date();
    let week = ['일', '월', '화', '수', '목', '금', '토', '일', '월', '화', '수', '목', '금', '토'];

    const clickOutside = (e) => {
        if (e.target.className === "openModal skiModal") {
            dispatch(loadBookmarks());
            props.close();
        }
        console.log(props.dayState.hourly_info);
    }
    const toggleStar = (e) => {
        if (emptyStar) {
            dispatch(addBookmark(props.resortId));
        } else {
            dispatch(deleteBookmark(props.resortId));
        }
        //dispatch(loadMyResorts)
        setEmptyStar(!emptyStar);
    }

    return (
    <Wrapper>
        <div className={props.open ? "openModal skiModal" : "skiModal"} onClick={clickOutside}>
        {props.open ? (
            <Section>
                {!props.dayState.icon ? <Loading /> :
                <>
                <Header>
                    <div onClick={toggleStar}>{emptyStar ? <AiOutlineStar className="modal-star"/> : <AiFillStar className="modal-star"/>}</div>
                    <div className="modal-resortName">{props.header}</div>
                    <Button onClick={props.close}>&times;</Button>
                </Header>

                    <TempWeather>
                        <TempImg src={props.dayState.icon} />
                        {/* <TempDate>{props.dayState.date} ({props.dayState.day})</TempDate> */}
                        <TempDate>{props.dayState.date.slice(5, 7)+"."+props.dayState.date.slice(8, 10)+" ("+week[t_date.getDay()]+")"}</TempDate>
                        <CBox><TempC>{props.dayState.tempCelcius}&deg;</TempC>
                        <TempDesc>{props.dayState.currentWeather}</TempDesc>
                        </CBox>
                        <div><MaxC className='temp-max'>최고 {props.dayState.tempMax}&deg;</MaxC><MinC>최저 {props.dayState.tempMin}&deg;</MinC></div>
                </TempWeather>

                <WeekWeather>
                    {props.dayState.hourly_info.slice(0,8).map(w => (
                        <EachDay>
                            <Img src={w.icon} />
                        </EachDay>
                    ))

                    }
                </WeekWeather>
{/*
                <WeekWeather>
                    {
                        props.dayState.week.map((elem) => (
                            <EachDay key={shortid.generate()}>
                                <TempDate>{elem.day}</TempDate>
                                <MaxC>{elem.max}&deg;</MaxC>
                                <MinC>{elem.min}&deg;</MinC>
                            </EachDay>
                        ))
                    }
                </WeekWeather>*/}

                <ResortInfo>
                
                        <Row><Label>운영 시간</Label><>매일 09:00 ~ 17:00 야간 19:00 ~ 22:00</></Row>
                        <Row><Label>운영 기간</Label><>연중무휴</></Row>
                        <Row><Label>이용 요금</Label>
                            <OutButton 
                                onClick={() => window.open(resortData.find(resort => resort.id === props.resortId).url, '_blank')}>
                                    보러가기
                                <SBsBoxArrowUpRight />
                            </OutButton>
                        </Row>
                        
                </ResortInfo>
                </>
            }
            </Section>
        ): null}
        </div>
    </Wrapper>
    )
}
const OutButton = styled.button`
border: none;
color: #FAFAFA;
background-color: var(--button-color);
padding: 6px 8px;
border-radius: 4px;
`
const SBsBoxArrowUpRight = styled(BsBoxArrowUpRight)`
width: 11px;
height: 11px;
padding-left: 4px;
`
const Wrapper = styled.div`
    .skiModal {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .openModal {
        display: flex;
        align-items: center;
        animation: modal-bg-shadow 0.3s;
    }
`

const Section = styled.div`
    width: 90%;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: var(--background-color);
    //animation: modal-show 0.3s;
    overflow: hidden;
`

const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
    .modal-star {
        width: 1.8rem;
        height: 1.8rem;
        padding-left: 9px;
        color: var(--button-color);
    }
    .modal-resortName {
        font-family: nanum-square-bold;
        font-size: 15px;
    }
`

const Button = styled.button`
    outline: none;
    cursor: pointer;
    border: 0;
    background-color: transparent;
    font-size: 30px;
`

const TempWeather = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    margin: 10px;
    margin-bottom: 0;
    padding-bottom: 20px;

    .temp-max{
        margin-right: 5px;
    }
`

const TempImg = styled.img`
    width: 90px;
    height: 90px;
`
const TempDate = styled.div`
    font-family: nanum-square-bold;
    font-size: 14px;
    padding-bottom: 10px;
`
const CBox = styled.div`
padding-bottom: 10px;
display: grid;
justify-items: center;
`
const TempDesc = styled.div`
    font-size: 14px;
    margin-right: 4px;
`

const TempC = styled.div`
    font-family: nanum-square-bold;
    font-size: 22px;
`

const MaxC = styled.span`
    font-size: 12px;
    //font-weight: bold;
    background-color: #CD5C5C;
    background-color: #B73E3E;
    color: #FAFAFA;
    padding: 3px 5px;
    border-radius: 5px;
    margin-right: 7px;
`
const MinC = styled.span`
    font-size: 12px;
    font-weight: bold;
    //background-color: #447F96;
    background-color: #628E90;
    color: #FAFAFA;
    padding: 3px 5px;
    border-radius: 5px;
    margin-left: 7px;
    margin-top: 3px;
`

// 주간 날씨
const WeekWeather = styled.div`
    display: flex;
    //justify-content: space-between;
    border-top: 1px solid #CCCCCC;
    //border-bottom: 1px solid #CCCCCC;
    margin: 10px 10px;
    padding-top: 8px;
`
const EachDay = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

const ResortInfo = styled.div`
    border-top: 1px solid #CCCCCC;
    margin: 20px;
    padding-top: 20px;
`
const Row = styled.div`
    display: flex;
    font-size: 12px;
    padding-bottom: 4px;
    align-items: center;
`
const Label = styled.div`
    margin-right: 9px;
    font-family: nanum-square-bold;
`
const Url = styled.div`
    font-size: 9px;
`


const Img = styled.img`

`