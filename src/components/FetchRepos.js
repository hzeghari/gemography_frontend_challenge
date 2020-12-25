// import logo from './logo.svg';
// import './App.css';
import React from 'react';
// import { render } from '@testing-library/react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

import GitHubButton from 'react-github-btn';


export default class FetchRepos extends React.Component{

    constructor(props){
      super(props)

      var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
      
      this.state={
        repos: [],
        loading: true,
        page: 1,
        currentDate: date,
      };
      console.log(date);

      var msDiff = new Date("June 30, 2035").getTime() - new Date().getTime();    //Future date - current date
      var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      console.log(daysTill30June2035);

    }
    
    

    async componentDidMount(){
        var url="";
        url="https://api.github.com/search/repositories?q=created:>2020-07-24&sort=stars&order=desc&page="+this.state.page;
        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(response => response.json())
            .then(responseJson => this.setState({
                repos: responseJson.items
            }))
            .catch(()=>{console.log("Api don't work at this time")})
    }

    onChange = (page,pageSize) =>{ // this is for change page ( Pagination )
    var url="";
    url="https://api.github.com/search/repositories?q=created:>2020-07-24&sort=stars&order=desc&page="+page+"&per_page"+pageSize;
    fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => this.setState({
            repos: responseJson.items
        }))
        .catch(()=>{console.log("il ya un erreur dans la connexion avec le serveur de Github")})
    }

    // getDifdays(){
    //   var diff = 
    //   return diff;
    // }

    render(){
      
    return (
      
    <React.Fragment>
      <div class="py-12 px-4 text-center">
        <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading">Gemography Front-End Challenge by <a class="underline" href="https://github.com/hzeghari">Hzeghari</a></h2>
        <p class="max-w-xl mx-auto mb-12 text-gray-400">Because no great company could exist without accountants, sellers, stock workers, and of course - paper.</p>
      </div>

      {/* <div class="w-full flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div> */}

        <Pagination defaultCurrent={1} pageSize={60} onChange={this.onChange} total={1000} />
      
      <table class="w-screen table-fixed">
        <thead class='align-middle'>
          <tr>
            <th  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> Repositories </th>
          </tr>
        </thead>
        <tbody>
            {this.state.repos.map(
                element =>
          <tr key={element.id}>
          <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src={element.owner.avatar_url} alt=""/>
                  </div>
                  <div class="ml-4 w-50">
                    <div class="text-sm font-medium text-gray-900">
                        {element.name}
                    </div>
                    <div class="w-screen text-sm text-gray-500">
                        {element.description}
                    </div>
                    <div class="text-sm text-gray-500">
                      {/* <div className='mr-1 inline box-content h-16 w-16 border-2 border-purple-500 hover:border-gray-500'>
                        Starts : {element.stargazers_count}
                      </div> */}
                      <div className='mr-1 inline'>
                        <GitHubButton href={element.html_url} data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star ntkme/github-buttons on GitHub">
                          Star
                        </GitHubButton>
                      </div>
                      {/* <div className='mr-1 inline box-content h-16 w-16 border-2 border-purple-500 hover:border-gray-500'>
                        Issues : {element.open_issues_count}
                      </div> */}
                      <div className='mr-1 inline'>
                        <GitHubButton href={element.html_url+"/issues"} data-icon="octicon-issue-opened" data-size="large" data-show-count="true" aria-label="Issue ntkme/github-buttons on GitHub">
                          Issue
                        </GitHubButton>
                      </div>
                      {/* <div className='inline'>
                        Created at / {element.created_at} / {this.state.currentDate} by  {element.owner.login}
                      </div> */}
                    </div>
                  </div>
                </div>
              </td>
          </tr>
          )}
        </tbody>
      </table>

      {/* </div>
      </div>
      </div> */}
    </React.Fragment>
  );
}
}