import Layout from '../components/Layout'
import logOut from '../utils/logOut';
import router from 'next/router';
import getConfig from 'next/config';
import { Modal, Button, InputItem, List, WhiteSpace, Toast } from 'antd-mobile';
import { register, unregister } from 'next-offline/runtime';
import Swal from 'sweetalert2';
import { changePassword } from '../api';

const { publicRuntimeConfig } = getConfig();
const prompt = Modal.prompt;

export default () => {
  const onClickRefresh = () => {
    unregister();
    setTimeout(() => { register() }, 100);
  }

  const changePasswordAction = (data) => {
    Swal.fire({ title: 'Validating', allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
    changePassword(data).then(async (res) => {
      if (res.status === 200) {
        await Swal.fire('Password changed!', '', 'success');
        localStorage.setItem('auth-token', res.data);
      }
    }).catch(async (err) => {
      let message = err.data;
      await Swal.fire({ title: 'Failed to change!', text: message, type: 'error', onOpen: () => { Swal.hideLoading() } });
    });
  }

  const onClickChangePassword = async () => {
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
    changePasswordAction(formValues);
  }

  return (
    <Layout title="Settings">
      <div className="w-full bg-white">
        <List renderHeader={() => 'Actions'}>
          <Button icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg" alt="" />}>Update the app</Button>
          <WhiteSpace size="lg" />
          <Button onClick={() => onClickChangePassword()}
          >Change Password</Button>
          <WhiteSpace size="lg" />
          <Button onClick={() => { logOut(); router.push(`${publicRuntimeConfig.basePath}/login`); }}>Log Out</Button>
        </List>
      </div>
    </Layout>
  )
}