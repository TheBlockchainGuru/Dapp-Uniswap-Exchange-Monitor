import React, { useState,useEffect,useRef } from 'react'
import { useHistory,useParams } from 'react-router-dom'
import { CCard, CCardBody, CForm, CFormGroup, CCol, CInput, CButton, CTextarea,CDropdownItem,CDropdownMenu,CDropdownToggle,CDropdown} from '@coreui/react'
import {auth} from '../../../../firebase'

import { database ,storage} from '../../../../firebase'
import CIcon from '@coreui/icons-react'
import { FilePicker } from "react-file-picker";


const UpdateRevtone = () => {
  const [avatar, setAvatar] = useState("");
  const [audio, setAudio] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carName, setCarName] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [categories,setCategories] = useState([]);


  const history = useHistory();
  const {id} = useParams();
  const hiddenAudioInput = useRef("Audio");
  const hiddenPhotoInput = useRef("Photo");
  const categoryTitleRef = useRef("categoryTitle");
    
  auth.onAuthStateChanged((user) => {
    if (!user) {
      history.replace("/login/")
    }
  })

  useEffect(() => {  

    database.ref('revton/' + id).get().then((snapshot) => {
      if (snapshot.exists) {
         const value = snapshot.val();
         const revton = {
                avatar: 'images/jpg/profilePic.png',
                audio: value.audio,
                car_make: value.car_make,
                car_model: value.car_model,
                car_name: value.car_name,
                category: value.category,
                keywords: value.keywords,
                notes: value.notes,
                photo: value.photo,
          }
              // setAvatar(revtonesData[0].avatar);
           setCarName(revton.car_name);
           setCarMake(revton.car_make);
           setCarModel(revton.car_model);
           setAudioSrc(revton.audio);
           setAvatar(revton.avatar);
           setKeywords(revton.keywords);
           setNotes(revton.notes);
           setPhotoSrc(revton.photo);
           setCategory(revton.category);
          
      }
     });

     database.ref('categories').get().then((snapshot) => {
 
      if (snapshot.exists) {
        const newArray = snapshot.val();
        const Data = [];
        if (newArray) {
          Object.keys(newArray).map((key, index) => {
            const value ={
              key,
              name: newArray[key].name,
              photo: newArray[key].photo
            };

            console.log("key:" + key + ":" + category);

            Data.push(value);
          })
        }  
        setCategories(Data);
      }
     });

     

    }, [])




    const addNewRevtone = async () => {

      const load = {
        avatar: "avatars/1.jpg",
        audio: audioSrc,// save audio firebase src path...
        car_make: carMake,
        car_model: carModel,
        car_name: carName,
        category: category,
        keywords: keywords,
        notes: notes,
        photo: photoSrc,// save photo firebase src path...
      }
  
      var audioLink = "";
      if(audio){
        audioLink = await new Promise((resolve, reject) => {
          const url = "/audio/" + id + "/" + audio.name;
          storage.ref(url).put(audio).then(function(snapshot) {
            storage.ref(url).getDownloadURL().then((link) => {
              console.log("resolve.......")
              resolve(link)
            }).catch((error) => {
              console.log("reject.......")
              reject('')
            })
          }).catch((error) => {
            console.log("catch.......")
            reject('')
          })
        })
      }
  
      if (audioLink){
        load.audio = audioLink;
        setAudioSrc(audioLink);
      }
  

      var photoLink = "";
      if(photo){
        photoLink = await new Promise((resolve, reject) => {
          const url = "/photo/" + id + "/" + photo.name;
          storage.ref(url).put(photo).then(function(snapshot) {
            storage.ref(url).getDownloadURL().then((link) => {
              console.log("resolve.......")
              resolve(link)
            }).catch((error) => {
              console.log("reject.......")
              reject('')
            })
          }).catch((error) => {
            console.log("catch.......")
            reject('')
          })
        })
      }
  
      if (photoLink){
        load.photo = photoLink;
        setPhotoSrc(photoLink);
      }
  

  
      var userListRef = database.ref('revton');
      var newUserRef = userListRef.push();
      newUserRef.set(load);
      history.replace('/admin/revtones');
    }
  


  const updateRevtoneData = async () => {

    const load = {
      avatar: "avatars/1.jpg",
      audio: audioSrc,// save audio firebase src path...
      car_make: carMake,
      car_model: carModel,
      car_name: carName,
      category: category,
      keywords: keywords,
      notes: notes,
      photo: photoSrc,// save photo firebase src path...
    }

    var audioLink = "";
    if(audio){
      audioLink = await new Promise((resolve, reject) => {
        const url = "/audio/" + id + "/" + audio.name;
        storage.ref(url).put(audio).then(function(snapshot) {
          storage.ref(url).getDownloadURL().then((link) => {
            console.log("resolve.......")
            resolve(link)
          }).catch((error) => {
            console.log("reject.......")
            reject('')
          })
        }).catch((error) => {
          console.log("catch.......")
          reject('')
        })
      })
    }

    if (audioLink){
      load.audio = audioLink;
      setAudioSrc(audioLink);
    }


    var photoLink = "";
    if(photo){
      photoLink = await new Promise((resolve, reject) => {
        const url = "/photo/" + id + "/" + photo.name;
        storage.ref(url).put(photo).then(function(snapshot) {
          storage.ref(url).getDownloadURL().then((link) => {
            console.log("resolve.......")
            resolve(link)
          }).catch((error) => {
            console.log("reject.......")
            reject('')
          })
        }).catch((error) => {
          console.log("catch.......")
          reject('')
        })
      })
    }

    if (photoLink){
      load.photo = photoLink;
      setPhotoSrc(photoLink);
    }


    var updates = {}
    updates['revton/'+ id] = load;
    database.ref().update(updates).then(function(){
      alert("Data saved successfully.");
      history.replace('/admin/revtones');
    }).catch(function(error) {
      alert("Data could not be saved." + error);
    });;
    
  }



  const setRigntone = () => {
    hiddenAudioInput.current.click();
  }

  const handleAudioChange = event => {
    setAudio(event.target.files[0]);
    setAudioSrc(URL.createObjectURL(event.target.files[0]));
    console.log("handle Ringtone Change....");
    console.log(event.target.files[0]);
  };

  const setPhotoUrl = () => {
    console.log("setPhotoUrl");
    hiddenPhotoInput.current.click();
  }

  const handlePhotoChange = event => {
    setPhoto(event.target.files[0]);
    setPhotoSrc(URL.createObjectURL(event.target.files[0]))
    console.log("handle Photo Change....");
    console.log(event.target.files[0]);
  };


  const handleCategory = (key,name) =>{
    setCategory(key);
    categoryTitleRef.current  = name;
  }

  const add = () => {

  }


  return (
    <CCard className="password">
        <CCardBody>
        <div className="today-show-content">
          <div className="today-show"><div className="line"></div><div className="today">Create New Revtone</div><div className="line"></div></div>
        </div>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Record Audio Files
              </CCol>
            </CFormGroup>

            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6" className="set-ringtone">
              <input id="myInput"
                      type="file"
                      ref={hiddenAudioInput}
                      style={{display: 'none'}}
                      onChange={handleAudioChange}
                    />
                <CButton className="save-password-btn form-file-button"  onClick={() => setRigntone()}>Set as Ringtone</CButton>
              </CCol>
            </CFormGroup>

            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Car Name
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                <CInput  id="car-name" value={carName} onChange={e => { setCarName(e.target.value) }}  name="car-name" />
              </CCol>
            </CFormGroup>


            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Car Make
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                <CInput  id="car-make" value={carMake} onChange={e => { setCarMake(e.target.value) }}  name="car-make" />
              </CCol>
            </CFormGroup>


            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Car Model
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                <CInput id="car-model" value={carModel} onChange={e => { setCarModel(e.target.value) }}  name="car-model" />
              </CCol>
            </CFormGroup>


            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Add photos
              </CCol>
            </CFormGroup>
            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6" className="upload">
              <input id="photo-input"
                      type="file"
                      ref={hiddenPhotoInput}
                      style={{display: 'none'}}
                      onChange={handlePhotoChange}
                    />
                <CButton className="save-password-btn"  onClick={setPhotoUrl}>upload</CButton>
              </CCol>
            </CFormGroup>


            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Category: {categoryTitleRef.current}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6">
                    <CDropdown className="mt-12">
                        <CDropdownToggle caret color="secondary" style={{width:"100%"}}>
                          Select Car Category
                        </CDropdownToggle>
                        <CDropdownMenu>
                          { 
                           categories.map((data, index) => {
                             return (
                              <CDropdownItem onClick={() => handleCategory(data.key,data.name)}><CIcon name="cil-user-follow" className="mr-2 text-success" />{data.name}</CDropdownItem>
                             )               
                          })
                          }
                          </CDropdownMenu>
                      </CDropdown>
              </CCol>
            </CFormGroup>


            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Tags/keywords
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" >
                <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..." 
                      value={keywords}
                      className="custom-form"
                      onChange={e => { setKeywords(e.target.value) }}
                    />
              </CCol>
            </CFormGroup>


            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6">
                Notes
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6">
                    <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      className="custom-form"
                      placeholder="Content..." 
                      value={notes}
                      onChange={e => { setNotes(e.target.value) }}
                    />
              </CCol>
            </CFormGroup>

            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6" className="set-ringtone">
                <CButton className="save-password-btn"  onClick={() => add()}>Add</CButton>
              </CCol>
            </CFormGroup>


            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6" className="set-ringtone">
                
                <CButton className="save-password-btn"  onClick={() => updateRevtoneData()}>Admin Upload</CButton>
              </CCol>
            </CFormGroup>



          </CForm>
        </CCardBody>
      </CCard>
  )
}

export default UpdateRevtone
