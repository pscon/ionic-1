import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor() { }





  fetch('http://plabbincom.atwebpages.com/wp-json/wp/v2/posts').then(response => {
    return response.json()
   }).then(posts => {
    console.log(posts);
    console.log(posts[0].content.rendered)
    textPrimary.className = 'text-primary';
    // textPrimary.innerHTML = posts[0].content.rendered;
    posts.forEach(post => {
     textPrimary.innerHTML += post.content.rendered;
    })
   
   });
   
   fetch('http://plabbincom.atwebpages.com/wp-json/jwt-auth/v1/token', {
    method: "POST",
    headers: {
     "content-Type": 'application/json',
     "accept": 'application/json',
    },
    body: JSON.stringify({
     username: 'ekunolapaul@gmail.com',
     password: 'Bincom123'
    })
   }).then(response => {
    return response.json()
   }).then(user => {
    console.log(user.token)
    localStorage.setItem('jwt', user.token)
   });
   
   
   //add post
   
   function addpost() {
       fetch('http://plabbincom.atwebpages.com/wp-json/wp/v2/posts', {
        method: "POST",
        headers: {
         "content-Type": 'application/json',
         "accept": 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
         title : title.value,
         content : content.value,
         status: 'publish'
        })
       }).then(response => {
        return response.json()
       }).then(post => {
        console.log(post)
       });
      }
   
      
      addPostButton.addEventListener('click', () => {
       if (!title.value) {
        document.querySelector('.invalidTitle').style.display = 'block';
       } else if(!content.value) {
        document.querySelector('.invalidContent').style.display = 'block';
       } else {
        addpost(); 
        title.value = '';
        content.value = '';
        posts.forEach(post => {
         textPrimary.innerHTML += post.content.rendered;
        });
       }
      })
      


  ngOnInit() {}

}
