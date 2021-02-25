import React, { Component, createRef } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

import './style/App.scss';

class App extends Component {
  state = {
    loading: false,
    data: null,
    showData: null,
    keywordOption: 'all',
    keywordText: '',
    controlChk: false,
    currentPage: 1,
    pageSize: 10,
  };

  keywordInput = createRef();

  getData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      this.setState({
        data: response.data,
        showData: response.data,
      });
    } catch (e) {
      console.error(e);
    }

    this.setState({
      loading: false,
    });
  };

  handleChange = (e) => {
		const { value, name } = e.target;

		this.setState({
			[name]: value,
		});

    this.changeData(name, value);
	};

  changeData = (filterKind, filterValue) => {
    if(filterKind === 'keywordOption') {
      if(filterValue === 'true') {
        this.setState({
          showData: this.state.data.filter((item) => item.completed === true),
        })
      } else if(filterValue === 'false') {
        this.setState({
          showData: this.state.data.filter((item) => item.completed === false),
        })
      } else {
        this.setState({
          showData : this.state.data,
        })
      }
    } else if(this.state.keywordText !== '') {
      this.setState({
        showData: this.state.data.filter((item) => item.title.toLowerCase().includes(filterValue)),
      })
    }
  }

  checkAll = (e) => {
    const { value, name } = e.target;

    this.setState({
			[name]: value,
			showData: this.state.showData.map((item) => (value === item.completed ? { ...item, ...value } : item)),
		});
		console.log(name);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.keywordOption && !this.state.keywordOption) {
      this.changeData();
    }
  }

  render() {
    const { showData, loading } = this.state;

    return (
      <main className='container'>
        <section className='todoFilter'>
          <form onSubmit={this.handleInsert}>
            <div className='todoSelect'>
              <select name="keywordOption" onChange={this.handleChange}>
                <option value='all'>all</option>
                <option value='true'>true</option>
                <option value='false'>false</option>
              </select>
            </div>
            <div className='todoInput'>
              <input type='text' value={this.state.keyword} name="keywordText" onChange={this.handleChange} ref={this.keywordInput} title='검색어 입력' placeholder='검색어를 입력하세요.' />
            </div>
          </form>
        </section>
        <TodoList showData={showData} loading={loading} checkAll={this.checkAll} />
      </main>
    );
  }
}

export default App;