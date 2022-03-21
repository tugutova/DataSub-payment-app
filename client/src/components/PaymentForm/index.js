import { useState } from 'react';
import axios from 'axios';

import {
  Form, Input, Button, Row, Modal,
} from 'antd';
import {
  LockOutlined, FieldNumberOutlined, CalendarOutlined, DollarOutlined,
} from '@ant-design/icons';

const PaymentForm = () => {
  const [form] = Form.useForm();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const showModal = (data) => {
    setModalData(data);
    setModalVisible(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };
  const onFinish = async (values) => {
    if (values) {
      const { data } = await axios.post('http://localhost:5000/new', values);
      console.log(data);
      const { requestId, paymentAmount: amount } = data;
      showModal({ requestId, amount });
    }
  };
  return (
    <>
      <Modal
        onCancel={handleCancel}
        onOk={handleCancel}
        visible={modalVisible}
        destroyOnClose
      >
        Данные с сервера:
        <br />
        requestId:
        {modalData.requestId}
        <br />
        amount:
        {modalData.amount}
      </Modal>
      <div style={{ marginTop: '200px' }}>
        <Row justify="center" align="middle">
          <h1 className="container">Введите данные карты</h1>
        </Row>
        <Row justify="center" align="middle">
          <Form
            form={form}
            name="form"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFieldsChange={() => setButtonDisabled(
              !form.isFieldsTouched(true)
              || form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0,
            )}
          >
            <Form.Item
              name="cardNumber"
              rules={[
                {
                  required: true,
                  message: 'Введите номер карты!',
                },
                { pattern: /^\d{16}$/, message: 'Нужно ввести 16 цифр!' },
              ]}
              hasFeedback
            >
              <Input prefix={<FieldNumberOutlined className="site-form-item-icon" />} placeholder="Card Number" />
            </Form.Item>
            <Form.Item
              name="expirationDate"
              rules={[
                {
                  required: true,
                  message: 'Введите срок действия карты!',
                },
                { pattern: /^(0[1-9]|1[0-2])\/(20[2-9])\d$/, message: 'Формат даты MM/YYYY' },
              ]}
              hasFeedback
            >
              <Input prefix={<CalendarOutlined className="site-form-item-icon" />} placeholder="Expiration Date" />
            </Form.Item>
            <Form.Item
              name="cvv"
              rules={[
                {
                  required: true,
                  message: 'Введите CVV!',
                },
                { pattern: /^\d{3}$/, message: 'CVV должен состоять из 3 цифр!' },
              ]}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="CVV"
              />
            </Form.Item>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: 'Введите сумму!',
                },
                { pattern: /^[1-9][0-9]{0,}$/, message: 'Введите корректную сумму' },
              ]}
              hasFeedback
            >
              <Input prefix={<DollarOutlined className="site-form-item-icon" />} placeholder="Amount" />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  block
                  type="primary"
                  disabled={buttonDisabled}
                  htmlType="submit"
                  className="login-form-button"
                >
                  Оплатить
                </Button>
              )}
            </Form.Item>
          </Form>
        </Row>
      </div>

    </>
  );
};

export default PaymentForm;
