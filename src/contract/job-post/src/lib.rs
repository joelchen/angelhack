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
  completed: bool, 
  accepted: bool
}

contract! {

  // Define contract data
  struct JobPost {
    // todo in future: make it a map with job id
    
    job: storage::Value<JobState>
  }

  event ContractOutput { result: bool }
  //
  // Define contract functions
    impl JobPost {
        
        // api to trigger boolean
        pub(external) fn completed(&mut self) {
            self.job.completed = true;

            env.emit(ContractOutput { result: self.job.completed });
            env.emit(ContractOutput { result: self.job.accepted });
        }

        pub(external) fn accepted(&mut self) {
            self.job.accepted = true;

            env.emit(ContractOutput { result: self.job.completed });
            env.emit(ContractOutput { result: self.job.accepted });

            let worker_public_key = env.caller();
            Runtime::call(
                Decode::decode(&mut &worker_public_key.encode()[..]).expect("it is an accountID"),
                0,      // nested gas allocation, `0` means use current meter reading
                10000,
                &vec![], // empty input payload
            );
        }
    }

  // Define contract instantiation logic
  impl Deploy for JobPost {
    fn deploy(&mut self) {
      self.job.set(JobState {
        completed: false, 
        accepted: false
      });
    }
  }
}