var reverseList = function(head){
  let prev = null;
  let curr = head;
  while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
  }
  console.log({prev});
  return prev;
  };
  const code = reverseList([1,3,6,7,8,9])
  console.log({code});
