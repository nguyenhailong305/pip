import CommonModal from "@/common/components/Modal";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

export default function HomeContainer() {
  const [form] = Form.useForm();

  
  return (
    <div>
      <>
      <Form form={form} layout="vertical">
      <Form.Item 
        name="username" 
        label="Username" 
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="password" 
        label="Password" 
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleCreate}>
          Create
        </Button>
      </Form.Item>
    </Form>
      </>
    </div>
  );
}
