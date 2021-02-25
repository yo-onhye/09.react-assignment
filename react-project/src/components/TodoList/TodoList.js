import React, { Component } from 'react';

class TodoList extends Component {

  render() {
    const { showData, loading, checkAll } = this.props;

    return (
      <section className='todoTbl'>
        {loading &&
          <h3 style={{ textAlign: 'center' }}>데이터 로딩 중 입니다....</h3>
        }

        {!loading &&
          showData &&
          !showData.error &&
          <table>
            <caption></caption>
            <colgroup>
              <col width='10%' />
              <col width='15%' />
              <col width='55%' />
              <col width='20%' />
            </colgroup>

            <thead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>User Id</th>
                <th scope='col'>Title</th>
                <th scope='col'><span className='todoChk'><input type='checkbox' name='controlChk' id="lb_tit" onChange={checkAll}></input><label htmlFor="lb_tit">Completed</label></span></th>
              </tr>
            </thead>

            <tbody>
            {showData.map((item) => 
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td><span className='todoChk'><input type='checkbox' id={`lb${item.id}`} defaultChecked={item.completed}></input><label htmlFor={`lb${item.id}`}>{item.title} Completed</label></span></td>
              </tr>)
            }
            </tbody>
          </table>
        }
      </section>
    );
  }
}

export default TodoList;