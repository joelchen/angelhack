#![no_std]
use ink_lang::contract;

use parity_codec::{
    Decode,
    Encode,
};

use ink_core::{
    storage
};

#[derive(Debug, Clone, PartialEq, Eq, Encode, Decode)]
struct JobState{
  started: bool, 
  completed: bool, 
  accepted: bool,
}

contract! {

  // Define contract data
  struct JobPost {
    // todo in future: make it a map with job id
    
    job: storage::Value<JobState>
  }

  // Define contract functions
    impl JobPost {
        
        // api to trigger boolean
        pub(external) fn started(&mut self) {
            self.job.started = true;
        }

        pub(external) fn completed(&mut self) {
            self.job.completed = true;
        }

        pub(external) fn accepted(&mut self) {
            self.job.accepted = true;
        }

        // pub(external) fn spin(&self, paymentAmount: i32, worker: AccountId, jobStarted: bool, jobCompleted: bool, jobAccepted: bool) {
            
        //     if jobCompleted == true && jobAccepted == true {
        //         Runtime::call(
        //             worker,
        //             0,      // nested gas allocation, `0` means use current meter reading
        //             AccountId.into(),
        //             &vec![], // empty input payload
        //         );
        //     }
        // }
    }

  // Define contract instantiation logic
  impl Deploy for JobPost {
    fn deploy(&mut self) {
      self.job.set(JobState {
        started: false, 
        completed: false, 
        accepted: false,
      });
    }
  }
}
