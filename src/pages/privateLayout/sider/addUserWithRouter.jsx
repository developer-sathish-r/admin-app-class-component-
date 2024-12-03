import { useNavigate,useParams } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import { Form } from 'antd';

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  const params=useParams();
 const [form] = Form.useForm();
 
  const object={ navigate, params,form}

  return (
    <WrappedComponent
      {...props}
      {...object}
    />
  );
};

export default withRouter;