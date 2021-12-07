import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    CButton,
    CInput,
    CLabel,
    CModal,
    CCardHeader,
    CModalBody,
    CFormGroup,
    CInputCheckbox,
    CCard,
    CCardBody,
} from '@coreui/react'

import { database } from '../../../../firebase'


const RevTones = () => {
    const [revItems, setRevItems] = useState([])

    const refreshRevtones = () => {
        database.ref('revton/').get().then((snapshot) => {

            if (snapshot.exists) {
                var revtonesData = [];
                const newArray = snapshot.val();
                if (newArray) {
                    Object.keys(newArray).map((key, index) => {
                        const value = newArray[key];
                        revtonesData.push({
                            id: index,
                            key,
                            avatar: 'images/jpg/profilePic.png',
                            audio: value.audio,
                            car_make: value.car_make,
                            car_model: value.car_model,
                            car_name: value.car_name,
                            country: value.country,
                            keywords: value.keywords,
                            notes: value.position,
                            photo: value.photo,
                        })
                    })
                    setRevItems(revtonesData);
                }
            }
        });
    }

    useEffect(() => {
        refreshRevtones();
    }, [])


    var removeRevtone = (key) => {
        database.ref('revton/' + key).remove();
        refreshRevtones();
    }

    var updateRevtone = (key) => { 
        history.push("/admin/updateRevtone/" + key);
    }

    const history = useHistory();

    var addRevtones = () => {
        history.push("/admin/newrevtone");
    }

    return ( <div className = "reports" >
        <CCard>
        <CCardBody>
        <div className = "today-show-content">
        <div className = "today-show" > <div className = "line" > </div><div className="today">RevTones</div> <div className = "line"> </div> 
        <CButton onClick = { () => addRevtones() } className = "btn btn-danger rounded-circle btn-revtones" > + </CButton> </div>
        </div> 
        <table className = "table table-hover table-outline mb-0 d-none d-sm-table">
        <tbody> {
            revItems.map((data, index) => {
                return (
                    <tr key = {index}>
                    <td className = "name-content" >
                    <div className = "ban-users-field" > {data.car_name} </div> </td> 
                    <td style = { { width: "100px" }}>
                    <CButton onClick = { () => updateRevtone(data.key)} className = "btn btn-update" > Update </CButton> </td>
                     <td>  <CButton onClick = {  () => removeRevtone(data.key)  }  className = "btn btn-remove" > Remove </CButton> </td>
                      </tr>
                )
            })
        } 
        </tbody> </table> </CCardBody> </CCard>

        </div>
    )
}

export default RevTones