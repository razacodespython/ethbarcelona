use dep::std;
use dep::ecrecover;

fn main(root : pub Field,
    index : Field,
    hash_path : [Field; 2],
    pub_key_x: [u8; 32], // diff
    pub_key_y: [u8; 32], // diff
    signature: [u8; 64], // diff
    hashed_message: [u8; 32],
    proposalId: pub Field,
    vote: pub Field
) -> pub Field {

    let address = ecrecover::ecrecover(pub_key_x, pub_key_y, signature, hashed_message); // diff

    let mut castedSignature : [Field; 64] = [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0
    ];

    for i in 0..32 {
        castedSignature[i] = signature[i] as Field;
    }

    let hashedSignature = std::hash::pedersen(castedSignature);

    let nullifier = std::hash::pedersen([
        root,
        hashedSignature[0],
        proposalId
    ]);

    let is_member = std::merkle::check_membership(root, address, index, hash_path);
    assert(is_member == 1);

    nullifier[0]
}