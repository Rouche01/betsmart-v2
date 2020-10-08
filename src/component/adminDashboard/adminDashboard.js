import React, { useEffect, useState } from 'react';
import styles from './adminDashboard.module.scss';
import Input from '../input/input';
import TipBox from '../tipBox/tipBox';

// for graphql API consumption
import { graphqlOperation, API } from "aws-amplify";
import { createTip, deleteTip } from '../../graphql/mutations';
import { listTips } from '../../graphql/queries';


const AdminDashboard = (props) => {
    const [loadingState, setLoadingState] = useState(false);
    const [formData, setFormData] = useState({
        homeTeam: '',
        awayTeam: '',
        league: '',
        odds: '',
        tips: '',
        risk: ''
    });
    const [tipsData, setTipsData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        fetchTips();
    }, []);

    const fetchTips = async() => {
        try {
            const tips = await API.graphql(graphqlOperation(listTips));
            const tipsData = tips.data.listTips.items;
            setTipsData(tipsData);
            console.log(tipsData);
        } catch(err) {
            console.log("error retrieving tips");
        }
    }

    const inputChange = e => {
        switch(e.target.id) {
            case 'homeTeam':
                setFormData({
                    ...formData,
                    homeTeam: e.target.value
                });
                break;
            case 'awayTeam':
                setFormData({
                    ...formData,
                    awayTeam: e.target.value
                });
                break;
            case 'league':
                setFormData({
                    ...formData,
                    league: e.target.value
                });
                break;
            case 'odds':
                setFormData({
                    ...formData,
                    odds: e.target.value
                });
                break;
            case 'tips':
                setFormData({
                    ...formData,
                    tips: e.target.value
                });
                break;
            case 'risk':
                setFormData({
                    ...formData,
                    risk: e.target.value
                });
                break;
            default:
                break;
        }
    }

    const deleteTipHandler = async(e) => {
        const targetIdx = e.target.parentNode.id;
        console.log('working', targetIdx);

        const copyTipsData = [...tipsData];
        const idx = copyTipsData.findIndex(targetTip => targetTip.id = targetIdx);
        console.log(copyTipsData[idx]);
        try {
            const target = copyTipsData[idx];
            await API.graphql(graphqlOperation(deleteTip, { input: target}));
            copyTipsData.splice(idx, 1);
            console.log(copyTipsData);
            setTipsData(copyTipsData);
        } catch(err) {
            console.log(err);
        }
    }

    const onSubmit = async() => {
        setLoadingState(true);

        const formResetState = {
            homeTeam: '',
            awayTeam: '',
            league: '',
            odds: '',
            tips: '',
            risk: ''
        };

        let errorsInit = {};

        for(const key in formData) {
            if(!formData[key]) {
                errorsInit[key] = "This field is required";
            }
        }

        setValidationErrors(errorsInit)

        if(Object.entries(errorsInit).length === 0) {
            console.log('Working!', formData);

            let copyTipsData = [...tipsData];
            copyTipsData.push(formData);

            try {
                await API.graphql(graphqlOperation(createTip, { input: formData}));
                setTipsData(copyTipsData);
                setFormData(formResetState);
                setLoadingState(false);
            } catch(err) {
                console.log(err);
                setFormData(formResetState);
                setLoadingState(false);
            }
        }
    }

    return(
        <div className={styles.adminDashboard}>
            <div className={styles.savedTips}>
                { tipsData.length > 0 && tipsData.map((tipData, idx) => {
                    return (
                        <TipBox key={`tipData_${idx}`} id={tipData.id} hTeam={tipData.homeTeam} aTeam={tipData.awayTeam} leagueName={tipData.league} odds={tipData.odds} tips={tipData.tips} riskLevel={tipData.risk} btnName='Delete Tip' btnHandler={deleteTipHandler} btnColor="#fff" btnBgColor="rgb(255, 153, 0)" />
                    )
                })
                }
            </div>
            <div className={styles.tipsForm}>
                <h3>Create a New Bet Tip</h3>
                <div className="row">
                    <div className="col-md-6">
                        <Input changed={inputChange} error={validationErrors.homeTeam} type='text' nameAttr='homeTeam' label='Home Team' id='homeTeam' value={formData.homeTeam} />
                    </div>
                    <div className='col-md-6'>
                        <Input changed={inputChange} error={validationErrors.awayTeam} type='text' nameAttr="awayTeam" label="Away Team" id="awayTeam" value={formData.awayTeam} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <Input changed={inputChange} error={validationErrors.league} type='text' nameAttr='leagueName' label='League' id='league' value={formData.league} />
                    </div>
                    <div className='col-md-6'>
                        <Input changed={inputChange} error={validationErrors.odds} type='number' nameAttr='odds' label='Odds' id='odds' value={formData.odds} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <Input changed={inputChange} error={validationErrors.tips} type='text' nameAttr='tips' label='Tips' id='tips' value={formData.tips} />
                    </div>
                    <div className='col-md-6'>
                        <Input changed={inputChange} error={validationErrors.risk} type='text' nameAttr='risk' label='Risk' id='risk' value={formData.risk} />
                    </div>
                </div>
                <button onClick={onSubmit} >Create Tip
                    <span className={loadingState ? [styles.isLoading, styles.btnLoader].join(' ') : styles.btnLoader}><i>Loading...</i></span>
                  </button>
            </div>
        </div>
    );
}

export default AdminDashboard;