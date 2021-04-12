import React from 'react'
import { App } from './App';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const createTestProps = (prop) => ({
  ...prop,
});

let props;

describe('App', () => {

  beforeEach(() => {
    props = createTestProps({
      classes: {},
    });
  });

  it('should render App', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render App with employee data', () => {
    let res = JSON.stringify([
      {
        firstName: 'New',
        lastName: 'No',
        email: 'p@com',
        phoneNo: '1234567890',
        department: "Backend",
      }]);
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    spy.mockImplementation(() => res)
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
    spy.mockRestore();
  });

  it('Check labels', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(TextField).at(0).props().label).toEqual('First name');
    expect(wrapper.find(TextField).at(1).props().label).toEqual('Last name');
    expect(wrapper.find(TextField).at(2).props().label).toEqual('Email');
    expect(wrapper.find(TextField).at(3).props().label).toEqual('Phone no');
    expect(wrapper.find(Select).props().label).toEqual('Department');
  });

  it('should call change for first name', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find(TextField).at(0).simulate('change', {
      target: {
        value: 'P',
        id: 'firstName',
      }
    });
    expect(wrapper.instance().state.data.firstName).toEqual('P');
  });

  it('should call change for last name', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find(TextField).at(1).simulate('change', {
      target: {
        value: 'N',
        id: 'lastName',
      }
    });
    expect(wrapper.instance().state.data.lastName).toEqual('N');
  });

  it('should call change for email', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find(TextField).at(2).simulate('change', {
      target: {
        value: 'p',
        id: 'email',
      }
    });
    expect(wrapper.instance().state.data.email).toEqual('p');
  });

  it('should call change for phone no', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find(TextField).at(3).simulate('change', {
      target: {
        value: '9',
        id: 'phoneNo',
      }
    });
    expect(wrapper.instance().state.data.phoneNo).toEqual('9');
  });

  it('should call change for department', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find(Select).simulate('change', {
      target: {
        value: 'Backend',
        id: 'department',
      }
    });
    expect(wrapper.instance().state.data.department).toEqual('Backend');
  });

  it('should call handleSubmit and do nothing as there is no data', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.find(Button).simulate('click', {});
    expect(wrapper.instance().state.data.firstName).toEqual('');
    expect(wrapper.instance().state.data.lastName).toEqual('');
    expect(wrapper.instance().state.data.email).toEqual('');
    expect(wrapper.instance().state.data.phoneNo).toEqual('');
    expect(wrapper.instance().state.data.department).toEqual('');
    expect(wrapper.instance().state.error.firstName).toBeTruthy();
    expect(wrapper.instance().state.error.lastName).toBeTruthy();
    expect(wrapper.instance().state.error.email).toBeTruthy();
    expect(wrapper.instance().state.error.phoneNo).toBeTruthy();
    expect(wrapper.instance().state.error.department).toBeTruthy();
  });

  it('should call handleSubmit store data in localstorage to existing data and clear form ', () => {
    let res = JSON.stringify([
      {
        firstName: 'New',
        lastName: 'No',
        email: 'p@com',
        phoneNo: '1234567890',
        department: "Backend",
      }]);
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    spy.mockImplementation(() => res)
    const wrapper = shallow(<App {...props} />);
    wrapper.setState({
      data: {
        firstName: 'Premdeep',
        lastName: 'Singh',
        email: 'prem@yopmail.com',
        phoneNo: '1234567890',
        department: 'Frontend',
      }
    });
    wrapper.find(Button).simulate('click', {});
    expect(wrapper.instance().state.data.firstName).toEqual('');
    spy.mockRestore();
  });

  it('should call handleSubmit store data in localstorage to empty data and clear form ', () => {
    let res = JSON.stringify('');
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    spy.mockImplementation(() => res)
    const wrapper = shallow(<App {...props} />);
    wrapper.setState({
      data: {
        firstName: 'Premdeep',
        lastName: 'Singh',
        email: 'prem@yopmail.com',
        phoneNo: '1234567890',
        department: 'Frontend',
      }
    });
    wrapper.find(Button).simulate('click', {});
    expect(wrapper.instance().state.data.firstName).toEqual('');
    spy.mockRestore();
  });

  it('should call handleSubmit and do nothing if error in first name', () => {
    let res = JSON.stringify('');
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    spy.mockImplementation(() => res)
    const wrapper = shallow(<App {...props} />);
    wrapper.setState({
      data: {
        firstName: '',
        lastName: 'Singh',
        email: 'prem@yopmail.com',
        phoneNo: '1234567890',
        department: 'Frontend',
      }
    });
    wrapper.find(TextField).at(0).simulate('change', {
      target: {
        value: '9',
        id: 'firstName',
      }
    });
    wrapper.find(Button).simulate('click', {});
    expect(wrapper.instance().state.error.firstName).toBeTruthy();
    spy.mockRestore();
  });

  it('should call handleSubmit and do nothing if error in last name', () => {
    let res = JSON.stringify('');
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    spy.mockImplementation(() => res)
    const wrapper = shallow(<App {...props} />);
    wrapper.setState({
      data: {
        firstName: 'Premdeep',
        lastName: '',
        email: 'prem@yopmail.com',
        phoneNo: '1234567890',
        department: 'Frontend',
      }
    });
    wrapper.find(TextField).at(1).simulate('change', {
      target: {
        value: '@',
        id: 'lastName',
      }
    });
    wrapper.find(Button).simulate('click', {});
    expect(wrapper.instance().state.error.lastName).toBeTruthy();
    spy.mockRestore();
  });

  it('should call handleSubmit and do nothing if error in email', () => {
    let res = JSON.stringify('');
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    spy.mockImplementation(() => res)
    const wrapper = shallow(<App {...props} />);
    wrapper.setState({
      data: {
        firstName: 'Premdeep',
        lastName: 'Singh',
        email: 'prem@yopmail.',
        phoneNo: '1234567890',
        department: 'Frontend',
      }
    });
    wrapper.find(TextField).at(2).simulate('change', {
      target: {
        value: 'prem@yopmail.d',
        id: 'email',
      }
    });
    wrapper.find(Button).simulate('click', {});
    expect(wrapper.instance().state.error.email).toBeTruthy();
    spy.mockRestore();
  });

  it('should call handleSubmit and do nothing if error in phone n0', () => {
    let res = JSON.stringify('');
    const spy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    spy.mockImplementation(() => res)
    const wrapper = shallow(<App {...props} />);
    wrapper.setState({
      data: {
        firstName: 'Premdeep',
        lastName: 'Singh',
        email: 'prem@yopmail.com',
        phoneNo: '955',
        department: 'Frontend',
      }
    });
    wrapper.find(TextField).at(3).simulate('change', {
      target: {
        value: '@',
        id: 'phoneNo',
      }
    });
    wrapper.find(Button).simulate('click', {});
    expect(wrapper.instance().state.error.phoneNo).toBeTruthy();
    spy.mockRestore();
  });
});