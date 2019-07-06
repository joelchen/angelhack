#![no_std]
use contract_sdk::{prelude::*};
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
  worker_public_key: ink_core::env::types::AccountId
}

contract! {

  // Define contract data
  struct JobPost {
    // todo in future: make it a map with job id
    
    job: storage::Value<JobState>
  }

  event ContractOutput { result: bool }

  // Define contract functions
    impl JobPost {
        
        // api to trigger boolean
        pub(external) fn started(&mut self) {
            self.job.started = true;
            env.emit(ContractOutput { result: self.job.started });
            // let worker_public_key = env.caller();
            self.job.worker_public_key = env.caller();
            // Runtime::call(
            //     Decode::decode(&mut &worker_public_key.encode()[..]).expect("it is an accountID"),
            //     0,      // nested gas allocation, `0` means use current meter reading
            //     1000,
            //     &vec![], // empty input payload
            // );
        }

        pub(external) fn completed(&mut self) {
            self.job.completed = true;
        }

        pub(external) fn accepted(&mut self) {
            self.job.accepted = true;
            let worker_public_key = self.job.worker_public_key;
            // let worker_public_key = env.caller();
            Runtime::call(
                Decode::decode(&mut &worker_public_key.encode()[..]).expect("it is an accountID"),
                0,      // nested gas allocation, `0` means use current meter reading
                20,
                &vec![], // empty input payload
            );
        }

    }

  // Define contract instantiation logic
  impl Deploy for JobPost {
    fn deploy(&mut self) {
      self.job.set(JobState {
        started: false, 
        completed: false, 
        accepted: false,
        worker_public_key: [0; u32]
      });
    }
  }
}
