import React from 'react';
import Swal from 'sweetalert2';
import { UserChangePassword } from '../api';

const changePassword = (data) => {
  Swal.fire({ title: 'Validating', allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
  UserChangePassword(data).then(async (res) => {
    if (res.status === 200) {
      await Swal.fire('Password changed!', '', 'success');
      localStorage.setItem('auth-token', res.data);
    }
  }).catch(async (err) => {
    let message = err.data;
    await Swal.fire({title:'Failed to change!', text:message, type:'error', onOpen: () => { Swal.hideLoading() }});
  });
}

const ChangePasswordComponent = (props) => {
  return (
    <div className={`flex bg-grey-lighter ${props.class} ${props.className}`} onClick={async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Change Password',
        html:
          '<input id="swal-input1" class="swal2-input" type="password" placeholder="current password" required autocomplete="false"/>' +
          '<input id="swal-input2" class="swal2-input" type="password" placeholder="new password" required autocomplete="false"/>' +
          '<input id="swal-input3" class="swal2-input" type="password" placeholder="repeat new password" required autocomplete="false"/>',
        focusConfirm: false,
        preConfirm: () => {
          return {
            "currentPassword": document.getElementById('swal-input1').value,
            "newPassword": document.getElementById('swal-input2').value,
            "newPasswordValidation": document.getElementById('swal-input3').value,
          }
        }
      });
      console.log(formValues);
      changePassword(formValues);
    }}>
      <button className={props.buttonClassName ? props.buttonClassName : "btn bg-blue-200 p-2 rounded-full"}>Change Password</button>
    </div>
  )
}

export default ChangePasswordComponent;