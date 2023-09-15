export function myFunction(param1: string, param2: number): string {
  const myValue = localStorage.getItem('workflowToken');
  if(myValue === null){
    window.location.href = "/";
  }
  return `${param1} ${param2}`;
}